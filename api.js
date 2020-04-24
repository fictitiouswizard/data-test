import { settings } from "./constants";
import cheerio from "react-native-cheerio";

const removeGarbage = (str) => {
  return str.replace(/[\n\r\t]/g, "");
};

export function fetchProject(projectId) {
  return new Promise((resolve, reject) => {
    const uri = "https://day9.tv/dk30/project/" + projectId;
    fetch(uri, {
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((responseText) => {
        responseText = removeGarbage(responseText);
        const nameSelector =
          "#view-project > div > div > div > div > div.col-12.col-md-8 > header > h1";
        const userSelector =
          "#view-project > div > div > div > div > div.col-12.col-md-8 > header > h5 > a:nth-child(1)";
        const categorySelector =
          "#view-project > div > div > div > div > div.col-12.col-md-8 > header > h5 > a:nth-child(2)";
        const eventSelector =
          "#view-project > div > div > div > div > div.col-12.col-md-8 > header > h5";
        const descriptionSelector =
          "#view-project > div > div > div > div > div.col-12.col-md-8 > div.card.padding-25.margin-bottom-25";
        const updateCardSelector = ".update-card";
        const root = cheerio.load(responseText);
        const projectName = root(nameSelector).text();
        const user = root(userSelector).text();
        const category = root(categorySelector).text();
        const event = settings.currentDK30;
        const banner = root(eventSelector).text().split(" ");
        const hearts = banner[banner.length - 2];
        const stars = banner[banner.length - 1];
        const description = root(descriptionSelector).html();
        const updateCardElements = root(updateCardSelector);

        let updateCards = [];

        if (updateCardElements.length > 0) {
          updateCards = updateCardElements
            .map((index, element) => {
              const username = root("div.meta.clearfix > a", element).text();
              const userLocation = root("div.meta.clearfix > a", element).attr(
                "href"
              );
              const timeSpan = root("div.meta.clearfix", element)
                .text()
                .substring(user.length);
              const content = root(
                "div.clear.margin-top-15.margin-bottom-15",
                element
              ).html();
              return {
                user: {
                  name: username,
                  location: userLocation,
                },
                timeSpan: timeSpan,
                content: content,
              };
            })
            .toArray();
        }

        resolve({
          projectName,
          user,
          category,
          event,
          hearts,
          stars,
          description,
          updateCards,
        });
      })
      .catch((err) => reject(err));
  });
}

export function fetchProjects(pageNumber, searchString = "") {
  return new Promise((resolve, reject) => {
    fetch(
      "https://day9.tv/dk30/projects/all-categories/" +
        pageNumber +
        "?search=" +
        searchString,
      {
        redirect: "follow",
      }
    )
      .then((response) => {
        const responseText = response.text();
        return responseText;
      })
      .then((responseText) => {
        let resultXml = "<result>" + responseText + "</result>";
        resultXml = removeGarbage(resultXml);

        const root = cheerio.load(resultXml);
        const listItems = root("li");

        const projects = listItems.map((index, item) => {
          const projectName = root(".title", item).text().trim();
          const location = root(".title", item).attr("href").trim();
          const projectId = location.substring("/dk30/project/".length).trim();
          const userName = root(".owner", item).text().trim();
          const userLocation = root(".owner", item).attr("href").trim();
          const categoryName = root(".category", item).text().trim();
          const categoryLocation = root(".category", item).attr("href").trim();
          const stats = root(".stats", item).text().trim().split(" ");
          const hearts = stats[0];
          const stars = stats[1];

          return {
            projectName: projectName,
            location: location,
            projectId: projectId,
            eventName: settings.currentDK30,
            user: {
              name: userName,
              location: userLocation,
            },
            category: {
              name: categoryName,
              location: categoryLocation,
            },
            hearts: hearts,
            stars: stars,
          };
        });

        resolve(projects);
      })
      .catch((error) => reject(error));
  });
}
