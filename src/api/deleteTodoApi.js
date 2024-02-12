import endPointUrl from "../endPoint";

export const deleteTodoBulkApi = async (ids, token ) => {

  const url = endPointUrl + "/todo/bulk";
  console.log( url );

  await fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(ids)
  })
}

const deleteTodoApi = async (id, token) => {
  const url = endPointUrl + `/todo/${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export default deleteTodoApi;
