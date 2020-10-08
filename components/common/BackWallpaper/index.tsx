import React from "react";
import styles from "./backWallpaper.module.css";

interface BackWallpaperProps {
  opacity?: number;
}

const BackWallpaper: React.FC<BackWallpaperProps> = ({ opacity }) => {
  return (
    <div className={styles.background} style={{ opacity }}>
      <img src="/assets/images/background.jpg" alt="." />
    </div>
  );
};

BackWallpaper.defaultProps = {
  opacity: 1,
};

export default BackWallpaper;
