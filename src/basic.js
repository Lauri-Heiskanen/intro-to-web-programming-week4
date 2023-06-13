if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const submitDataButton = document.getElementById("submit-data");
  submitDataButton.addEventListener("click", searhShowFormSubmit);
}

function searhShowFormSubmit(event) {
  event.preventDefault();
  let formData = new FormData(document.getElementById("search-show-form"));
  const searchQuery = formData.get("query");
  fetchShows(searchQuery);
}

async function fetchShows(query) {
  const showDataPromise = await fetch(
    "https://api.tvmaze.com/search/shows?q=" + query
  );
  const showData = await showDataPromise.json();
  console.log(showData);
  updateResults(showData);
}

function updateResults(showData) {
  const resultListContainer = document.getElementById("result-list-container");
  resultListContainer.innerHTML = "";
  for (const show of showData) {
    const showDataDiv = document.createElement("div");
    showDataDiv.classList.add("show-data");

    const image = document.createElement("img");
    // some of the shows returned in testing  had image: null
    // theres propably a better way of checking for this on every level but this works
    if ("image" in show["show"]) {
      if (show["show"]["image"] != null) {
        if ("medium" in show["show"]["image"]) {
          if (show["show"]["image"]["medium"] != null) {
            image.setAttribute("src", show["show"]["image"]["medium"]);
          }
        }
      }
    }
    const showInfoDiv = document.createElement("div");
    showInfoDiv.classList.add("show-info");

    const showTitle = document.createElement("h1");
    showTitle.innerText = show["show"]["name"];

    showInfoDiv.appendChild(showTitle);
    showInfoDiv.innerHTML = showInfoDiv.innerHTML + show["show"]["summary"];
    showDataDiv.appendChild(image);
    showDataDiv.appendChild(showInfoDiv);
    resultListContainer.appendChild(showDataDiv);
  }
}
