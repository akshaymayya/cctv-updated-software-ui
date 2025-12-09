import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer, FileText } from 'lucide-react';

const documents = {
    'quick-start': {
        title: 'Quick Start Guide: Pro-X Series',
        date: 'October 2023',
        version: '1.2',
        content: (
            <div className="doc-content">
                <h1>1. Getting Started</h1>
                <p>Thank you for choosing the Catifaal Pro-X Series. This guide will help you set up your new surveillance system efficiently.</p>

                <h2>1.1 What's in the Box</h2>
                <ul>
                    <li>Pro-X Camera Unit</li>
                    <li>Power Adapter (12V/2A)</li>
                    <li>Mounting Kit (Screws & Anchors)</li>
                    <li>Waterproof Ethernet Connector</li>
                    <li>Quick Start Guide</li>
                </ul>

                <h2>1.2 Hardware Installation</h2>
                <p><strong>Step 1:</strong> Select a mounting location with a clear field of view and access to power/network.</p>
                <p><strong>Step 2:</strong> Use the mounting template to drill holes. Insert anchors and secure the bracket.</p>
                <p><strong>Step 3:</strong> Attach the camera to the bracket and adjust the angle.</p>

                <div className="warning-box">
                    <strong>⚠️ CAUTION:</strong> Ensure power is disconnected before installing wiring.
                </div>

                <h1>2. Connection & Setup</h1>
                <p>Connect the camera to your network using a standard Cat5e/Cat6 Ethernet cable. Power on the device.</p>
                <p>The LED indicator will blink <strong>GREEN</strong> when ready for pairing.</p>
            </div>
        )
    },
    'network-config': {
        title: 'Network Configuration & Port Forwarding',
        date: 'September 2023',
        version: '2.0',
        content: (
            <div className="doc-content">
                <h1>Network Requirements</h1>
                <p>To ensure stable remote access, your network must meet the following criteria:</p>
                <ul>
                    <li>Upload speed: Minimum 2 Mbps per camera (1080p)</li>
                    <li>Latency: &lt; 100ms recommended</li>
                    <li>Static IP address (recommended for NVR)</li>
                </ul>

                <h1>Port Forwarding</h1>
                <p>If UPnP is disabled, manually forward the following ports in your router settings:</p>
                <table className="doc-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Port (Default)</th>
                            <th>Protocol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HTTP</td>
                            <td>80</td>
                            <td>TCP</td>
                        </tr>
                        <tr>
                            <td>RTSP</td>
                            <td>554</td>
                            <td>TCP/UDP</td>
                        </tr>
                        <tr>
                            <td>HTTPS</td>
                            <td>443</td>
                            <td>TCP</td>
                        </tr>
                        <tr>
                            <td>Device Service</td>
                            <td>8000</td>
                            <td>TCP</td>
                        </tr>
                    </tbody>
                </table>

                <h1>DDNS Configuration</h1>
                <p>Enable DDNS in <strong>Settings &gt; Network &gt; DDNS</strong> if you do not have a static IP.</p>
            </div>
        )
    },
    'ai-calibration': {
        title: 'AI Detection Calibration Guide',
        date: 'November 2023',
        version: '1.5',
        content: (
            <div className="doc-content">
                <h1>Understanding AI Detection</h1>
                <p>The Pro-X series utilizes advanced neural networks to distinguish between humans, vehicles, and pets.</p>

                <h1>Calibration Steps</h1>
                <h2>1. Define Detection Zones</h2>
                <p>Go to <strong>Camera Settings &gt; Smart Event &gt; Intrusion Detection</strong>. Draw a polygon over the area you wish to monitor.</p>

                <h2>2. Sensitivity Adjustment</h2>
                <p>Adjust sensitivity based on the environment:</p>
                <ul>
                    <li><strong>High (80-100):</strong> For quiet, indoor areas.</li>
                    <li><strong>Medium (50-80):</strong> Standard outdoor use.</li>
                    <li><strong>Low (1-50):</strong> High-traffic areas or areas with moving foliage.</li>
                </ul>

                <h2>3. Object Size Filtering</h2>
                <p>Set the minimum and maximum object size to reduce false alarms from insects or light changes.</p>
            </div>
        )
    },
    'firmware-notes': {
        title: 'Firmware Update v2.4 Release Notes',
        date: 'December 01, 2023',
        version: '2.4.1',
        content: (
            <div className="doc-content">
                <h1>Release Highlights</h1>
                <p>This update brings significant performance improvements to night vision and AI processing speed.</p>

                <h1>New Features</h1>
                <ul>
                    <li><strong>Enhanced Night Vision:</strong> Improved low-light clarity with new noise reduction algorithm.</li>
                    <li><strong>Pet Detection:</strong> Beta support for identifying cats and dogs.</li>
                    <li><strong>Time-Lapse:</strong> Create 24h time-lapse videos directly from the playback menu.</li>
                </ul>

                <h1>Bug Fixes</h1>
                <ul>
                    <li>Fixed an issue where RTSP streams would disconnect after 48 hours.</li>
                    <li>Resolved a UI glitch in the privacy mask settings.</li>
                    <li>Improved Wi-Fi reconnection stability.</li>
                </ul>
            </div>
        )
    }
};

const DocumentViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const doc = documents[id];

    if (!doc) return <div style={{ color: '#fff', padding: '40px' }}>Document not found.</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', color: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Printer size={18} /> Print
                    </button>
                    <button className="btn primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </div>

            <div className="animate-fade-in" style={{
                background: '#fff',
                color: '#000',
                padding: '60px',
                borderRadius: '4px',
                minHeight: '800px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>CATIFAAL SYSTEMS INC.</div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontFamily: 'serif' }}>{doc.title}</h1>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '14px', color: '#666' }}>
                        <div>Date: {doc.date}</div>
                        <div>Version: {doc.version}</div>
                    </div>
                </div>

                <div className="document-body">
                    {doc.content}
                </div>

                <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '12px', color: '#999', textAlign: 'center' }}>
                    © 2023 Catifaal Systems Inc. All rights reserved. Confidential & Proprietary.
                </div>
            </div>

            <style>{`
        .doc-content h1 { font-size: 24px; margin-top: 30px; margin-bottom: 16px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        .doc-content h2 { font-size: 18px; margin-top: 24px; margin-bottom: 12px; color: #444; }
        .doc-content p { line-height: 1.6; margin-bottom: 16px; color: #333; }
        .doc-content ul { margin-bottom: 16px; padding-left: 20px; }
        .doc-content li { margin-bottom: 8px; color: #333; }
        .warning-box { background: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 16px; borderRadius: 4px; margin: 20px 0; }
        .doc-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .doc-table th, .doc-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .doc-table th { background-color: #f8f9fa; font-weight: 600; }
      `}</style>
        </div>
    );
};

export default DocumentViewer;
