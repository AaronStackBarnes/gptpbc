const textInput = document.getElementById("text-input");
const output = document.getElementById("output");

function splitContent(content) {
  const maxLength = 4000;
  const chunks = [];
  let start = 0;

  while (start < content.length) {
    let end = start + maxLength;
    if (end < content.length) {
      while (content[end] !== " " && content[end] !== "\n" && end > start) {
        end--;
      }
    } else {
      end = content.length;
    }
    chunks.push(content.slice(start, end));
    start = end;
  }

  return chunks;
}
textInput.addEventListener("paste", (event) => {
  // Using setTimeout to ensure the pasted content is available in the textarea
  setTimeout(() => {
    const content = textInput.value;
    const chunks = splitContent(content);

    output.textContent = `The text has been divided into ${chunks.length} chunks of less than 4000 characters each.`;

    let index = 0;
    updateProgressBar(chunks, index);
    copyChunkWithPrompt(chunks, index);

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" && index > 0) {
        index--;
      } else if (event.key === "ArrowRight" && index < chunks.length - 1) {
        index++;
      } else {
        return;
      }
      updateProgressBar(chunks, index);
      copyChunkWithPrompt(chunks, index);
    });
  }, 0);
});
function updateProgressBar(chunks, index) {
  const progressBar = document.getElementById("progress-bar");
  const progress = ((index + 1) / chunks.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function copyChunkWithPrompt(chunks, index) {
  const chunk = chunks[index];
  const totalChunks = chunks.length;
  const prompt = `You will receive ${totalChunks} chunks of text. After receiving all the chunks, you will be asked questions about the content. Here is chunk ${
    index + 1
  } of ${totalChunks}:\n\n${chunk}. \n\n Please write a bulleted list of the important points in this chunk.`;
  electron.clipboardy.writeSync(prompt);
  output.textContent = `Chunk ${index + 1}/${
    chunks.length
  } copied to clipboard with prompt.`;
}
