let endpointCollection = [];

try {
  const res = await fetch('/api/endpoints');
  endpointCollection = await res.json();

  const container = document.getElementById('endpointsContainer');
  if (container) {
    let html = '';

    endpointCollection.forEach((group, groupIndex) => {
      html += '<h2>' + group.category + '</h2><ul>';
      group.items.forEach((item, itemIndex) => {
        const color = item.isSuccess ? '#34d399' : '#f87171';
        html += '<li>';
        html +=
          '<button class="endpoint-btn" style="color: ' +
          color +
          '" onclick="executeMock(' +
          groupIndex +
          ', ' +
          itemIndex +
          ')">';
        html += '<span class="badge badge-post">' + item.method + '</span>';
        html += item.path;
        html += '<span class="scenario-text">(' + item.label + ')</span>';
        html += '</button>';
        html += '</li>';
      });
      html += '</ul>';
    });

    container.innerHTML = html;
  }
} catch (e) {
  console.error(e);
  const container = document.getElementById('endpointsContainer');
  if (container) {
    container.textContent = 'Failed to load endpoints.';
  }
}

async function executeMock(groupIndex, itemIndex) {
  const output = document.getElementById('output');
  if (!output) return;

  output.textContent = 'Processing live mock execution...';
  try {
    const item = endpointCollection[groupIndex].items[itemIndex];
    const response = await fetch(item.path, {
      method: item.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item.payload),
    });
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
    output.style.color = response.ok ? '#34d399' : '#f87171';
  } catch (error) {
    console.error(error);
    output.textContent = 'Network execution failure: ' + error.message;
    output.style.color = '#f87171';
  }
}

window.executeMock = executeMock;
