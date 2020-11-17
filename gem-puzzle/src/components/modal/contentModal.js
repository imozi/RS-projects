import iconStart from '../../assets/img/icon-start.svg';
import iconStop from '../../assets/img/icon-stop.svg';
import iconSave from '../../assets/img/icon-save.svg';
import iconReload from '../../assets/img/icon-reload.svg';
import iconResults from '../../assets/img/icon-results.svg';
import iconSettings from '../../assets/img/icon-settings.svg';
import iconInfo from '../../assets/img/icon-info.svg';

export default [
  {
    info: `
      <h2>Игра «Пятнашки»</h2>
      <hr />
      <p>Цель игры — перемещая костяшки по коробке, добиться упорядочивания их по номерам, желательно сделав как можно меньше перемещений.</p>
        <ul>
          <li>Cтарт игры: <img src="${iconStart}" alt="Начать игру"></li>
          <li>Приостановить игру: <img src="${iconStop}" alt="Приостановить игру"></li>
          <li>Запустить новую игру: <img src="${iconReload}" alt="Запустить новую игру"></li>
          <li>Сохранить игру: <img src="${iconSave}" alt="Сохранить игру"></li>
          <li>Результаты: <img src="${iconResults}" alt="Результаты"></li>
          <li>Сменить межим игры: <img src="${iconSettings}" alt="Настройки"></li>
          <li>Описание: <img src="${iconInfo}" alt="Описание игры"></li>
        </ul>
    `,
  },
  {
    settings: `
      <h2>Режимы игры</h2>
      <hr />
    `,
    mode: ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'],
  },
];
