/* eslint-disable class-methods-use-this */
export default class Gui {
  constructor() {
    this.status = document.querySelector('[data-id=status]');
    this.title = document.querySelector('[data-id=title]');
    this.data = document.querySelector('[data-id=data]');
    this.list = document.querySelector('.list');
    this.modal = document.querySelector('.modal');
    this.modalButtons = document.querySelectorAll('.modal button');
    this.widget = document.querySelector('.ticketswidget');
  }

  rowTemplate(id, status, title, data) {
    return `
    <div class="row" data-id="${id}">
      <div data-id="status">${status}</div>
      <div data-id="title">${title}</div>
      <div data-id="data">${data}</div>
      <button data-id="edit">edit</button>
      <button data-id="del">del</button>
    </div>`;
  }

  editTemplate(header, title, description) {
    return `
      <h3>${header}</h3>
      Краткое описание <input type="text" data-id="title" value="${title}"><br>
      Подробное описание <input type="text" data-id="description" value="${description}"><br>
      <button>Отмена</button>
      <button>Ок</button>`;
  }

  descriptionTemplate(title, description) {
    return `
    ${title}
    <p>${description}</p>
    `;
  }

  delTemplate() {
    return `
    <h3>Удалить тикет</h3>
    <p>Are you sure? It's can't be cancelled.</p>
    <button>Cancel</button>
    <button data-id="del">Ok</button>
    `;
  }
}
