import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ShortsHeader from "../components/ShortsHeader";
import Footer from "../components/Footer";

const ShortsLayout = () => {
  const location = useLocation();
  const isUploadPage = location.pathname === "/shorts/upload";

  useEffect(() => {
    // CSS 파일을 동적으로 로드 (배포 환경 고려)
    const link = document.createElement("link");
    link.rel = "stylesheet";

    // 개발 환경과 배포 환경을 구분하여 경로 설정
    const isDev = import.meta.env.DEV;
    let cssPath;

    if (isDev) {
      // 개발 환경: Vite dev server에서 직접 서빙
      cssPath = "/src/features/shorts/css/style.css";
    } else {
      // 배포 환경: Vite가 빌드 시 assets 폴더로 이동
      // Vite는 CSS 파일을 /assets/ 폴더로 이동시키고 해시를 추가
      // 실제 경로는 /assets/style-[hash].css 형태가 됨
      // 하지만 동적 로딩에서는 정확한 해시를 알 수 없으므로
      // nginx에서 정적 파일을 직접 서빙하도록 설정 필요
      cssPath = "/src/features/shorts/css/style.css";
    }

    link.href = cssPath;
    link.id = "shorts-css";

    document.head.appendChild(link);

    // 컴포넌트 언마운트 시 CSS 제거
    return () => {
      const existingLink = document.getElementById("shorts-css");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, []);

  return (
    <>
      <ShortsHeader />
      <Outlet />
      {!isUploadPage && <Footer />}
    </>
  );
};
export default ShortsLayout;
