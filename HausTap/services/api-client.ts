import axios from 'axios';

const apiClient = axios.create({
    // Using your local Laravel API base URL (HTTP recommended for local dev)
    baseURL: 'http://192.168.100.13',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Host': 'HausTap.local',
    },
    // If your local server uses a self-signed certificate you may run into TLS issues
    // when using https://127.0.0.1:8000. If so, consider using http://127.0.0.1:8000
    // or configure your environment to trust the certificate.
});

export default apiClient;