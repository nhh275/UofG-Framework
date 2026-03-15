(() => {
  document.querySelectorAll("[data-calendar]").forEach(root => {
    
    // internal structure
    root.innerHTML = `
      <div class="zh-calendar__pagination" data-pagination></div>

      <div class="zh-calendar__weekdays">
        <span>M</span><span>T</span><span>W</span>
        <span>T</span><span>F</span><span>S</span><span>S</span>
      </div>

      <h2 class="zh-calendar__month" data-month-label></h2>

      <table class="zh-calendar__table">
        <tbody data-calendar-body></tbody>
      </table>
    `;

    const monthLabel = root.querySelector("[data-month-label]");
    const body = root.querySelector("[data-calendar-body]");
    const pagination = root.querySelector("[data-pagination]");

    // pagination
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    monthNames.forEach((m, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = m;
      btn.setAttribute("data-page", String(i));
      pagination.appendChild(btn);
    });

    const paginationButtons = pagination.querySelectorAll("button");

    // Read events from HTML attribute
    function getEventDays() {
      const raw = root.getAttribute("data-events") || "";
      return new Set(
        raw
          .split(",")
          .map(s => parseInt(s.trim(), 10))
          .filter(n => Number.isFinite(n))
      );
    }

    // Start on current month
    let view = new Date();
    view.setDate(1);

    function render() {
      const year = view.getFullYear();
      const month = view.getMonth();

      // Month label
      monthLabel.textContent = view.toLocaleDateString(undefined, { month: "long" });

      paginationButtons.forEach(btn => {
        const m = parseInt(btn.getAttribute("data-page"), 10);
        btn.classList.toggle("is-active", m === month);
      });

      const today = new Date();
      const isThisMonth = today.getFullYear() === year && today.getMonth() === month;

      const firstDay = new Date(year, month, 1);

      let dow = firstDay.getDay();
      dow = dow === 0 ? 7 : dow;

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const eventDays = getEventDays();

      body.innerHTML = "";

      let day = 1;

      for (let row = 0; row < 6; row++) {
        const tr = document.createElement("tr");

        for (let col = 1; col <= 7; col++) {
          const td = document.createElement("td");
          td.className = "zh-calendar__cell";

          if (row === 0 && col < dow) {
            td.classList.add("zh-calendar__cell--empty");
            tr.appendChild(td);
            continue;
          }

          if (day > daysInMonth) {
            td.classList.add("zh-calendar__cell--empty");
            tr.appendChild(td);
            continue;
          }

          const btn = document.createElement("button");
          btn.className = "zh-calendar__day";
          btn.type = "button";

          const dateSpan = document.createElement("span");
          dateSpan.className = "zh-calendar__date";
          dateSpan.textContent = String(day);

          btn.appendChild(dateSpan);

          // today highlight
          if (isThisMonth && day === today.getDate()) {
            td.classList.add("zh-calendar__cell--today");
          }

          // Event marker
          if (eventDays.has(day)) {
            const dot = document.createElement("span");
            dot.className = "zh-calendar__marker";
            btn.appendChild(dot);
          }

          td.appendChild(btn);
          tr.appendChild(td);

          day++;
        }

        body.appendChild(tr);
        if (day > daysInMonth) break;
      }
    }

    paginationButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const monthIndex = parseInt(btn.getAttribute("data-page"), 10);
        view = new Date(view.getFullYear(), monthIndex, 1);
        render();
      });
    });

    render();
  });
})();