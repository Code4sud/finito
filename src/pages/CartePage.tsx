import React, { useEffect, useRef, useState } from "react";

const CartePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(11);
  const TILE_SIZE = 380;//256;
  let offsetX = 0;
  let offsetY = 0;

  const loadTiles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas rendering context not found");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tiles = getTileRange(zoomLevel);

    tiles.forEach(tile => {
      const imgSrc = `/images/${zoomLevel}_${tile.x}_${tile.y}.png`;
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        ctx.drawImage(
          img,
          (tile.x - offsetX) * TILE_SIZE,
          (tile.y - offsetY) * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      };
    });
  };

  const getTileRange = (zoom: number) => {
    const range = [];
    const minX = 0, maxX = 2 ** (zoom - 11);
    const minY = 0, maxY = 2 ** (zoom - 11);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        range.push({ x, y });
      }
    }
    return range;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    let startX = e.clientX;
    let startY = e.clientY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      offsetX -= (moveEvent.clientX - startX) / TILE_SIZE;
      offsetY -= (moveEvent.clientY - startY) / TILE_SIZE;
      startX = moveEvent.clientX;
      startY = moveEvent.clientY;
      loadTiles();
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    setZoomLevel(prevZoom => Math.max(11, Math.min(19, prevZoom + (e.deltaY > 0 ? -1 : 1))));
  };

  const zoomIn = () => {
    setZoomLevel(prevZoom => Math.min(19, prevZoom + 1));
  };

  const zoomOut = () => {
    setZoomLevel(prevZoom => Math.max(11, prevZoom - 1));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      // Redimensionner le canvas pour qu'il occupe la taille du conteneur
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Ajuster la taille interne du canvas (en pixels)
      canvas.width = containerWidth;
      canvas.height = containerHeight;

      // Redimensionner le canvas dans le DOM pour rester responsive
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      loadTiles();
    }
  }, [zoomLevel]);

  return (
    <div>
    <h1
      style={{
        fontSize: "2em",
        color: "#333",
        marginTop: "20px",
        justifyContent: "center",   // Centre horizontalement
        textAlign: "center",        // Aligne le texte au centre
      }}
    >
      Carte Offline
    </h1>
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "40vw",
        height: "80vh",
        maxWidth: "90%",
        maxHeight: "80%",
        border: "2px solid #ccc",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eaeaea",
        overflow: "hidden",
        margin: "auto",
        display: "flex",
        flexDirection: "column", // Ajouter flexDirection pour gérer la disposition du titre et du canvas
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5vh"
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        style={{ width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <button
          onClick={zoomIn}
          style={{
            width: "30px",
            height: "30px",
            fontSize: "20px",
            margin: "5px 0",
            cursor: "pointer",
            backgroundColor: "#fff",
            border: "1px solid #aaa",
            borderRadius: "5px",
            outline: "none"
          }}
        >
          +
        </button>
        <button
          onClick={zoomOut}
          style={{
            width: "30px",
            height: "30px",
            fontSize: "20px",
            margin: "5px 0",
            cursor: "pointer",
            backgroundColor: "#fff",
            border: "1px solid #aaa",
            borderRadius: "5px",
            outline: "none"
          }}
        >
          -
        </button>
      </div>
    </div>
    </div>
  );
};

export default CartePage;