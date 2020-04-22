import { parseString } from "react-native-xml2js";

const removeGarbage = (str) => {
  return str.replace(/[\n\r\t]/g, "");
};

export function fetchProjects(pageNumber) {
  return new Promise((resolve, reject) => {
    fetch(
      "https://day9.tv/dk30/projects/all-categories/" + pageNumber + "?search=",
      {
        redirect: "follow",
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        let resultXml = "<result>" + responseText + "</result>";

        parseString(resultXml, (err, result) => {
          let projects = result.result.ul[0].li.map((item) => {
            let eventName = removeGarbage(item.span[0]._);
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
