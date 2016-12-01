export const TOPICS_DIR = `${Remote.app.getPath('userData')}/topics`;

const checkDir = (path) => {
  FS.access(path, FS.F_OK, function(err) {
    if (err) {
      FS.mkdir(filesPath);
    }
  });
}

export const getTopicPath = (topicId) => {
  const path = `${TOPICS_DIR}/${topicId}`;
  checkDir(TOPICS_DIR);
  checkDir(path);

  return path;
}
