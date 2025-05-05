"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

function barStyle(open: boolean, index: number): React.CSSProperties {
  const common: React.CSSProperties = {
    height: "2px",
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
  const headerList = [
    { name: "一覧", path: "/" },
    { name: "サブスク登録", path: "/register" },
    { name: "アカウント", path: "/account" },
    { name: "グラフ", path: "/graph" },
    { name: "サブスク仕分け", path: "/check" },
    { name: "ログアウト", path: "/logout" },
    { name: "詳細", path: "/detail" },
  ];

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
            width: "35px",
            height: "30px",
            zIndex: 1001,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "fixed",
            top: 10,
            right: 15,
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
          padding: "0 20px",
          boxSizing: "border-box",
          zIndex: 5,
          transition: "right 0.3s ease",
        }}
      >
        <div
          style={{
            marginTop: "70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            height: "100%",
          }}
        >
          {headerList.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              style={{
                textDecoration: "none",
                color: "inherit",
                marginBottom: "20px",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* <div style={{ textAlign: "center", color: "black", marginTop: "40px" }}>
          <p>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              一覧
            </Link>
          </p>
          <p>
            <Link
              href="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              サブスク登録
            </Link>
          </p>
          <p>
            <Link
              href="/account"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              アカウント
            </Link>
          </p>
        </div> */}
      </nav>
    </div>
  );
};

export default Header;
