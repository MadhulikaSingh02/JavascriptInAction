const insertHere = document.querySelector("#insert");
window.addEventListener(
  "keydown",
  function (event) {
    insertHere.innerHTML = `
    <div class="color">
    <table>
    <caption>
      Key press:
    </caption>
    <thead>
      <tr>
        <th scope="col">Key</th>       
        <th scope="col">Code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">${event.key === " " ? "Space" : event.key}</th>       
        <td>${event.code}</td>
      </tr>
    </tbody>    
  </table>
  </div>
  `;
  },
  false
);
