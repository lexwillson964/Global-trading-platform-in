
document.addEventListener("DOMContentLoaded", function () {

  const marketSelect = document.getElementById("marketSelect");
  const timeframeSelect = document.getElementById("timeframeSelect");
  const tradingViewChart = document.getElementById("tradingViewChart");
  const selectedMarketName = document.getElementById("selectedMarketName");

  function updateTradingChart() {

    if (!marketSelect || !timeframeSelect || !tradingViewChart) {
      return;
    }

    const symbol = marketSelect.value;
    const interval = timeframeSelect.value;

    const marketName =
      marketSelect.options[marketSelect.selectedIndex].text;

    selectedMarketName.textContent = marketName;

    const chartURL =
      "https://www.tradingview.com/widgetembed/?" +
      "symbol=" + encodeURIComponent(symbol) +
      "&interval=" + encodeURIComponent(interval) +
      "&theme=dark" +
      "&style=1" +
      "&timezone=Asia%2FKolkata" +
      "&withdateranges=1" +
      "&hide_side_toolbar=0" +
      "&allow_symbol_change=1" +
      "&save_image=0" +
      "&locale=en";

    tradingViewChart.src = chartURL;
  }

  if (marketSelect && timeframeSelect) {
    marketSelect.addEventListener("change", updateTradingChart);
    timeframeSelect.addEventListener("change", updateTradingChart);
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });

});
/* INVESTMENT PLAN PROFIT COUNTER ANIMATION */

document.addEventListener("DOMContentLoaded", function () {

  const profitNumbers = document.querySelectorAll(".plan-card h3:nth-of-type(2)");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        const element = entry.target;

        if (element.dataset.animated === "true") return;

        element.dataset.animated = "true";

        const finalAmount = Number(
          element.textContent.replace(/[^\d]/g, "")
        );

        const duration = 2200;
        const startTime = performance.now();

        function animateCounter(currentTime) {

          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          // Smooth ease-out animation
          const easedProgress = 1 - Math.pow(1 - progress, 4);

          const currentAmount = Math.floor(
            finalAmount * easedProgress
          );

          element.textContent =
            "₹" + currentAmount.toLocaleString("en-IN");

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            element.textContent =
              "₹" + finalAmount.toLocaleString("en-IN");
          }

        }

        requestAnimationFrame(animateCounter);

      }

    });

  }, {
    threshold: 0.5
  });

  profitNumbers.forEach((number) => {
    observer.observe(number);
  });

});
