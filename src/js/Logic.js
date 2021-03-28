/* eslint-disable class-methods-use-this */
export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.tickets = null;
  }

  init() {
    this.getTickets();
    this.gui.widget.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.dataset.id === 'edit') this.editTicket(e);
      else if (e.target.dataset.id === 'del') this.delTicket(e);
      else if (e.target.dataset.id === 'title') this.showDescription(e);
      else if (e.target.dataset.id === 'add') this.addTicket(e);
    });
    this.gui.modal.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'BUTTON' && e.target.dataset.id === 'del') {
        const { id } = e.target.parentElement.dataset;
        this.tickets.splice((id - 1), 1);
        this.fillFields(this.tickets);
        this.gui.modal.classList.add('hidden');
      } else if (e.target.tagName === 'BUTTON') this.gui.modal.classList.add('hidden');
    });
  }

  addTicket() {
    this.gui.modal.classList.remove('hidden');
    this.gui.modal.innerHTML = this.gui.editTemplate('Добавить тикет', '', '');
  }

  async showDescription(e) {
    const { id } = e.target.parentElement.dataset;
    const result = await this.sendXHR(`ticketById&id=${id}`);
    e.target.innerHTML = this.gui.descriptionTemplate(
      result.name, result.description,
    );
  }

  async editTicket(e) {
    this.gui.modal.classList.remove('hidden');
    const { id } = e.target.parentElement.dataset;
    const result = await this.sendXHR(`ticketById&id=${id}`);
    this.gui.modal.innerHTML = this.gui.editTemplate(
      'Изменить тикет', result.name, result.description,
    );
  }

  delTicket() {
    this.gui.modal.classList.remove('hidden');
    this.gui.modal.innerHTML = this.gui.delTemplate();
  }

  async getTickets() {
    this.tickets = await (this.sendXHR('allTickets'));
    this.fillFields((this.tickets));
  }

  async sendXHR(method) {
    const xhr = new XMLHttpRequest();
    // const url = `http://localhost:7070/?method=${method}`;
    const url = `https://ahj-http-back.herokuapp.com?method=${method}`;
    xhr.open('GET', url, false);
    xhr.send();
    xhr.addEventListener('loadend', async () => {
      // console.log('loadend:', xhr.status);
    });
    return JSON.parse(xhr.responseText);
  }

  fillFields(tArr) {
    this.gui.list.innerHTML = '';
    tArr.forEach((ticket) => {
      this.gui.list.innerHTML += this.gui.rowTemplate(
        ticket.id, ticket.status, ticket.name, ticket.created,
      );
    });
  }
}
