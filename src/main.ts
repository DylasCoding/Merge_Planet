import { Application } from 'pixi.js';

const app = new Application();

async function initGame() {
    await app.init({
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
    });

    document.body.appendChild(app.canvas);

    console.log('PixiJS is ready!');
}

// Chạy hàm khởi tạo
initGame();