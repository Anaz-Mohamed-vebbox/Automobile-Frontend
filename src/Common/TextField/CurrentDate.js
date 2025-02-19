
export const getCuurentDate = () => {
    const date = new Date();
    // var suma = date.toLocaleDateString();
    let dateVar = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month =
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const formattedDate = `${date.getFullYear()}-${month}-${dateVar}`;
    return formattedDate;
  };

  export const getCurrentDateTime = () => {
    const date = new Date();

    let dateVar = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();

    let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    let seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;

    const formattedDateTime = `${year}-${month}-${dateVar} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
};
