document.getElementById("uploadForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;

  if (files.length === 0) {
    alert("Por favor, selecione pelo menos uma imagem.");
    return;
  }

  const formData = new FormData();

  // Adiciona os arquivos no formato que a API espera
  for (const file of files) {
    formData.append("files", file); // "files" deve corresponder ao nome esperado pela API
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/get-plate-number", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Limpa resultados anterioress
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "";

    // Exibe os resultados
    for (const [filename, plate] of Object.entries(data)) {
      const listItem = document.createElement("li");
      listItem.textContent = `${filename}: ${plate}`;
      resultsList.appendChild(listItem);
    }
  } catch (error) {
    document.getElementById("responseContainer").textContent = `Erro: ${error.message}`;
    console.error(error);
  }
});
