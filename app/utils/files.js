export const TOPICS_DIR = `${Remote.app.getPath('userData')}/Topics`;

const checkDir = (path) => {
  try { FS.accessSync(path); }
  catch(e) { FS.mkdirSync(path); }
}

export const getTopicDir = (topicId) => {
  const topicDir = `${TOPICS_DIR}/${topicId}`;
  checkDir(TOPICS_DIR);
  checkDir(topicDir);

  return topicDir;
}

export const addFileToTopic = (topicId, file) => {
  const topicDir = getTopicDir(topicId);
  const name = Path.basename(file);

  FS.createReadStream(file).pipe(FS.createWriteStream(`${topicDir}/${name}`));
}
