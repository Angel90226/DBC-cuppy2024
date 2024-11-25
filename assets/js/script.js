(function () {
    // 獲取 URL 中的 cupId
    const urlParams = new URLSearchParams(window.location.search);
    const cupIdFromUrl = urlParams.get("cupId");

    if (cupIdFromUrl) {
        // 將 cupId 存入 localStorage
        localStorage.setItem("cupId", cupIdFromUrl);

        // 清除 URL 中的 cupId 參數以保持 URL 整潔
        // const newUrl = window.location.origin + window.location.pathname;
        // window.history.replaceState({}, document.title, newUrl);

        console.log(`cupId "${cupIdFromUrl}" saved to localStorage.`);
    } else {
        // 如果未檢測到 cupId，顯示錯誤提示或引導用戶操作
        console.error("No cupId detected in URL.");
    }
    
    // 從 localStorage 獲取 cupId，若無則使用預設值 "1"
    const cupId = localStorage.getItem("cupId") || "1";

    // 定義對應的背景圖片路徑
    const backgroundImages = {
        index: `./assets/images/${cupId}/hide.webp`,
        home: `./assets/images/${cupId}/full.webp`,
        journal: `./assets/images/${cupId}/front.webp`
    };

    // 獲取 body 標籤
    const body = document.body;

    // 根據 body 的類名設定背景圖片
    if (body.classList.contains("index")) {
        body.style.backgroundImage = `url('${backgroundImages.index}')`;
    } else if (body.classList.contains("home")) {
        body.style.backgroundImage = `url('${backgroundImages.home}')`;
    } else if (body.classList.contains("journal")) {
        body.style.backgroundImage = `url('${backgroundImages.journal}')`;
    }
})();
