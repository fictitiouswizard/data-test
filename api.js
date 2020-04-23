import { parseString } from "react-native-xml2js";
import { settings } from "./constants";
import cheerio from "react-native-cheerio";

const removeGarbage = (str) => {
  return str.replace(/[\n\r\t]/g, "");
};

export function fetchProject(projectId) {
  return new Promise((resolve, reject) => {
    console.log(projectId);
    const uri = "https://day9.tv/dk30/project/" + projectId;
    console.log(uri);
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
      });
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

        parseString(resultXml, (err, result) => {
          let projects = result.result.ul[0].li.map((item) => {
            let eventName = removeGarbage(
              item.span[0]._ ? item.span[0]._ : settings.currentDK30
            );
            let [hearts, stars] = removeGarbage(item.span[1]._)
              .trim()
              .split(" ");

            return {
              projectName: item.a[0]._,
              location: item.a[0].$.href,
              projectId: item.a[0].$.href.substring(14),
              eventName: eventName,
              user: {
                name: removeGarbage(item.span[0].a[0]._),
                location: item.span[0].a[0].$.href,
              },
              category: {
                name: item.span[0].a[1]._,
                location: item.span[0].a[1].$.href,
              },
              hearts: hearts,
              stars: stars,
            };
          });
          resolve(projects);
        });
      })
      .catch((error) => reject(error));
  });
}
