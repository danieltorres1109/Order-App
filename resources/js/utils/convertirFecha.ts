import moment from "moment";

// 11 Noviembre 2019
export const parseDate = (dateString: string) => {
    let date = new Date(`${dateString}`);
    moment.locale("es");
    let now = moment(date).format("D MMMM Y");
    return now;
};

// Parse date with "DEL": 09 de noviembre del 2009"
export const parseDateWithDel = (dateString: string) => {
    let date = new Date(`${dateString}T00:00:00`);
    moment.locale("es");
    let now = moment(date).format("DD [DE] MMMM [DEL] YYYY").toUpperCase();
    return now;
};

// 11 09 1996
export const parseDateSimple = (dateString: string) => {
    let date = new Date(`${dateString}`);
    moment.locale("es");
    let now = moment(date).format("DD/MM/YYYY");
    return now;
};

export const parseDateTimeSimple = (dateString: string) => {
    let date = new Date(`${dateString}`);
    moment.locale("es");
    let now = moment(date).format("DD/MM/YYYY HH:mm");
    return now;
};

// Get Fecha para peticion de top
export const getYearAndMonth = () => {
    moment().date();
    let month = moment().month().toString();

    const year = moment().year();

    if (month.toString().length === 1) {
        month = `0${month}`;
    }

    return {
        month,
        year,
    };
};

// 11 Noviembre 2019
export const getMonthSpanish = () => {
    moment().date();
    moment.locale("es");
    let now = moment().format("MMMM");
    return now;
};

// Get data Actuak
export const getCurrentDate = (): string => {
    moment.locale("es");
    const now = moment().format("DD [DE] MMMM [DEL] YYYY");
    return now;
};

export const safeParseDateWithDel = (dateString?: string): string => {
    if (!dateString) {
        return "Fecha no disponible";
    }
    let date = new Date(dateString);
    moment.locale("es");
    return moment(date).format("DD MMM YY, HH:mm").toUpperCase();
};

export const formatDateTime = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
