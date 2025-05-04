"use client";
import React from "react";
import { useState } from "react";

function barStyle(open: boolean, index: number): React.CSSProperties {
  const common: React.CSSProperties = {
    height: "3px",
    background: "white",
    margin: "6px 0",
    transition: "0.4s",
  };

  if (!open) return { ...common };

  if (index === 1) {
    return {
      ...common,
      transform: "rotate(45deg) translate(6px, 6px)",
    };
  }
  if (index === 2) {
    return {
      ...common,
      opacity: 0,
    };
  }
  if (index === 3) {
    return {
      ...common,
      transform: "rotate(-45deg) translate(7px, -7px)",
    };
  }

  return common;
}

type Props = {};

const Header: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          padding: "24px 16px",
          width: "100%",
          backgroundColor: "#284B63",
        }}
      />

      <div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "40px",
            height: "30px",
            zIndex: 1001,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "fixed",
            top: 5,
            right: 5,
          }}
        >
          <div style={barStyle(open, 1)} />
          <div style={barStyle(open, 2)} />
          <div style={barStyle(open, 3)} />
        </button>
      </div>

      <nav
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-100%",
          height: "100vh",
          backgroundColor: "#DDDDDD",
          padding: "20px",
          boxSizing: "border-box",
          zIndex: 5,
          transition: "right 0.3s ease",
        }}
      >
        <div style={{ textAlign: "center", color: "black", marginTop: "40px" }}>
          <p>
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
              一覧
            </a>
          </p>
          <p>
            <a
              href="/subscription/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              サブスク登録
            </a>
          </p>
          <p>
            <a
              href="/account"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              アカウント
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
