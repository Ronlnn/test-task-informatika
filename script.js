document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('hexagon-container');

  const gridPositions = [
    { column: 2, row: 5 },
    { column: 3, row: 4 },
    { column: 4, row: 3 }, // Центр
    { column: 5, row: 2 },
    { column: 6, row: 1 },
  ];

  let activeIndex = 2; // Центральный гексагон
  const events = [
    { date: '30', month: 'МАЯ', details: 'Ак Барс Арена', time: '20:00' },
    { date: '17', month: 'ИЮНЯ', details: 'Рубин Стадион', time: '21:00' },
    { date: '26', month: 'ИЮНЯ', details: 'Стадион', time: '19:00' },
    { date: '16', month: 'ИЮЛЯ', details: 'Ипподром', time: '13:00' },
    { date: '30', month: 'СЕНТЯБРЯ', details: 'Ак Барс', time: '15:00' },
  ];

  // Рендеринг гексагонов
  function renderHexagons() {
    container.innerHTML = '';

    events.forEach((event, index) => {
      const hexagon = document.createElement('div');
      hexagon.className = 'hexagon';

      //  Позиции гексагона
      const position = gridPositions[index];
      hexagon.style.gridColumn = position.column;
      hexagon.style.gridRow = position.row;


      if (index === activeIndex) {
        hexagon.classList.add('active');
        hexagon.innerHTML = `
          <div class="hexagon-text">${event.details}</div>
          <div class="date">${event.date} ${event.month}</div>
          <div>${event.time}</div>
          <button class="hexagon-button">Купить билет</button>
        `;
      } else {
        hexagon.innerHTML = `
          <span class="hexagon-text">${event.date}</span>
          <span>${event.month}</span>
        `;
      }

      hexagon.addEventListener('click', () => setActiveHexagon(index));
      container.appendChild(hexagon);
    });
  }

  // Перемещения активного гексагона в центр
  function setActiveHexagon(index) {
    if (index === activeIndex) return;

    const [clickedEvent] = events.splice(index, 1);
    events.splice(activeIndex, 0, clickedEvent);
    renderHexagons();
  }

  // Скролл
  function scrollHexagons(direction) {
    if (direction === 1 && activeIndex < events.length - 1) {
      const [last] = events.splice(events.length - 1, 1);
      events.unshift(last);
    } else if (direction === -1 && activeIndex > 0) {
      const [first] = events.splice(0, 1);
      events.push(first);
    }
    renderHexagons();
  }

  // Обработчик скролла
  container.addEventListener('wheel', (e) => {
    const direction = e.deltaY > 0 ? 1 : -1;
    scrollHexagons(direction);
  });

  renderHexagons();
});