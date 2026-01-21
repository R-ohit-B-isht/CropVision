import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, ProgressBar, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./batchAnalysis.css";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const BACKEND_URL = "http://localhost:8000/api/predict/";
const MAX_CONCURRENT_UPLOADS = 3;

let globalAnalysisCache = {};
let globalRequestId = 0;

function BatchAnalysis() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [syncStatus, setSyncStatus] = useState("idle");
  const fileInputRef = useRef(null);
  const processingRef = useRef(false);
  const intervalRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("analysisHistory");
    if (savedResults) {
      setAnalysisResults(JSON.parse(savedResults));
    }
    
    intervalRef.current = setInterval(() => {
      syncWithServer();
    }, 5000);

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (analysisResults.length > 0) {
      localStorage.setItem("analysisHistory", JSON.stringify(analysisResults));
      globalAnalysisCache = { ...globalAnalysisCache, results: analysisResults };
    }
  }, [analysisResults]);

  useEffect(() => {
    if (uploadQueue.length > 0 && !processingRef.current) {
      processQueue();
    }
  }, [uploadQueue]);

  const handleStorageChange = (e) => {
    if (e.key === "analysisHistory") {
      const newResults = JSON.parse(e.newValue);
      setAnalysisResults(newResults);
    }
  };

  const handleOnline = () => {
    setSyncStatus("syncing");
    syncWithServer();
  };

  const handleOffline = () => {
    setSyncStatus("offline");
  };

  const syncWithServer = async () => {
    if (syncStatus === "syncing") return;
    
    setSyncStatus("syncing");
    
    try {
      const localData = localStorage.getItem("analysisHistory");
      const serverData = await fetchServerData();
      
      if (localData && serverData) {
        const merged = mergeResults(JSON.parse(localData), serverData);
        setAnalysisResults(merged);
        localStorage.setItem("analysisHistory", JSON.stringify(merged));
      }
      
      setSyncStatus("synced");
    } catch (err) {
      setSyncStatus("error");
    }
  };

  const fetchServerData = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "history/");
      return response.data;
    } catch {
      return null;
    }
  };

  const mergeResults = (local, server) => {
    const merged = [...local];
    server.forEach(item => {
      if (!merged.find(m => m.id === item.id)) {
        merged.push(item);
      }
    });
    return merged;
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setError(null);
    setProgress(0);
    setCompletedCount(0);
  };

  const processQueue = async () => {
    processingRef.current = true;
    const currentQueue = [...uploadQueue];
    
    const batches = [];
    for (let i = 0; i < currentQueue.length; i += MAX_CONCURRENT_UPLOADS) {
      batches.push(currentQueue.slice(i, i + MAX_CONCURRENT_UPLOADS));
    }

    for (const batch of batches) {
      const promises = batch.map(file => analyzeImage(file));
      await Promise.all(promises);
    }

    processingRef.current = false;
    setUploadQueue([]);
  };

  const analyzeImage = async (file) => {
    const requestId = ++globalRequestId;
    
    const formData = new FormData();
    formData.append("sentFile", file);

    abortControllerRef.current = new AbortController();

    try {
      const response = await axios.post(BACKEND_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: abortControllerRef.current.signal,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          updateProgress(file.name, percentCompleted);
        },
      });

      const result = {
        id: requestId,
        fileName: file.name,
        disease: response.data.Disease_Name,
        confidence: response.data.Score,
        timestamp: new Date().toISOString(),
        synced: false,
      };

      setAnalysisResults(prev => [...prev, result]);
      setCompletedCount(count => count + 1);
      
      globalAnalysisCache[file.name] = result;

      return result;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request cancelled");
      } else {
        setError(`Failed to analyze ${file.name}: ${err.message}`);
        const failedResult = {
          id: requestId,
          fileName: file.name,
          error: err.message,
          timestamp: new Date().toISOString(),
          synced: false,
        };
        setAnalysisResults(prev => [...prev, failedResult]);
      }
      return null;
    }
  };

  const updateProgress = (fileName, percent) => {
    setProgress(prev => {
      const baseProgress = (completedCount / selectedFiles.length) * 100;
      const currentFileProgress = (percent / selectedFiles.length);
      return baseProgress + currentFileProgress;
    });
  };

  const startBatchAnalysis = () => {
    if (selectedFiles.length === 0) {
      setError("Please select files first");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setCompletedCount(0);
    setAnalysisResults([]);

    setUploadQueue(selectedFiles);

    setTimeout(() => {
      if (progress < 100) {
        checkProcessingStatus();
      }
    }, 30000);
  };

  const checkProcessingStatus = () => {
    if (isProcessing && completedCount < selectedFiles.length) {
      setError("Processing is taking longer than expected...");
    }
  };

  const cancelAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsProcessing(false);
    setUploadQueue([]);
    processingRef.current = false;
  };

  const clearHistory = () => {
    setAnalysisResults([]);
    localStorage.removeItem("analysisHistory");
    globalAnalysisCache = {};
  };

  const retryFailed = () => {
    const failedItems = analysisResults.filter(r => r.error);
    const filesToRetry = selectedFiles.filter(f => 
      failedItems.some(item => item.fileName === f.name)
    );
    
    if (filesToRetry.length > 0) {
      setUploadQueue(filesToRetry);
    }
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(analysisResults, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `crop-analysis-${Date.now()}.json`;
    link.click();
  };

  const getStatusColor = (result) => {
    if (result.error) return "danger";
    if (result.confidence > 0.8) return "success";
    if (result.confidence > 0.5) return "warning";
    return "secondary";
  };

  return (
    <Container fluid className="batch-analysis-section">
      <Container>
        <h1 className="batch-heading">
          Batch <strong className="Fluorescent-Blue">Disease Analysis</strong>
        </h1>
        <p>Upload multiple plant images for concurrent disease detection.</p>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="upload-card">
              <Card.Body>
                <div className="upload-area">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    accept="image/*"
                    className="file-input"
                  />
                  <Button
                    variant="outline-primary"
                    onClick={() => fileInputRef.current.click()}
                    disabled={isProcessing}
                  >
                    Select Images
                  </Button>
                  <span className="file-count">
                    {selectedFiles.length} files selected
                  </span>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="selected-files">
                    {selectedFiles.map((file, index) => (
                      <span key={index} className="file-tag">
                        {file.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="action-buttons mt-3">
                  <Button
                    variant="primary"
                    onClick={startBatchAnalysis}
                    disabled={isProcessing || selectedFiles.length === 0}
                  >
                    {isProcessing ? "Processing..." : "Start Analysis"}
                  </Button>
                  {isProcessing && (
                    <Button variant="danger" onClick={cancelAnalysis}>
                      Cancel
                    </Button>
                  )}
                  <Button variant="secondary" onClick={clearHistory}>
                    Clear History
                  </Button>
                  <Button variant="info" onClick={exportResults}>
                    Export Results
                  </Button>
                  <Button variant="warning" onClick={retryFailed}>
                    Retry Failed
                  </Button>
                </div>

                {isProcessing && (
                  <div className="progress-section mt-3">
                    <ProgressBar
                      now={progress}
                      label={`${Math.round(progress)}%`}
                      animated
                      striped
                    />
                    <small>
                      Completed: {completedCount} / {selectedFiles.length}
                    </small>
                  </div>
                )}

                <div className="sync-status">
                  <span className={`sync-indicator ${syncStatus}`}>
                    {syncStatus === "syncing" && "Syncing..."}
                    {syncStatus === "synced" && "Synced"}
                    {syncStatus === "offline" && "Offline"}
                    {syncStatus === "error" && "Sync Error"}
                    {syncStatus === "idle" && ""}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        <Row>
          <Col md={12}>
            <h3>Analysis Results ({analysisResults.length})</h3>
            <div className="results-grid">
              {analysisResults.map((result, index) => (
                <Card
                  key={index}
                  className={`result-card border-${getStatusColor(result)}`}
                >
                  <Card.Body>
                    <Card.Title>{result.fileName}</Card.Title>
                    {result.error ? (
                      <Card.Text className="text-danger">
                        Error: {result.error}
                      </Card.Text>
                    ) : (
                      <>
                        <Card.Text>
                          <strong>Disease:</strong> {result.disease}
                        </Card.Text>
                        <Card.Text>
                          <strong>Confidence:</strong>{" "}
                          {(result.confidence * 100).toFixed(2)}%
                        </Card.Text>
                      </>
                    )}
                    <Card.Footer>
                      <small className="text-muted">
                        {new Date(result.timestamp).toLocaleString()}
                      </small>
                      {!result.synced && (
                        <span className="not-synced-badge">Not synced</span>
                      )}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <ScrollToTop />
    </Container>
  );
}

export default BatchAnalysis;
