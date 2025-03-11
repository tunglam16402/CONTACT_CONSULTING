import { useEffect } from "react";

function ScrollRestoration() {
  useEffect(() => {
    // Thiết lập chế độ cuộn của trình duyệt
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Khôi phục vị trí scroll từ sessionStorage
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, Number(savedPosition));
    }

    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

export default ScrollRestoration;
