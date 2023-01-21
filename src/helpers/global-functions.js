export const formatDate = (date) => {
  const parsedDate = new Date(date);
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();
  return `${month}/${year}`;
};

const bullet = "●";
const bulletWithSpace = `${bullet} `;

export const formatDescription = (value) => {
  const lines = value.split("\n");
  // only add bullet to the lines that have at least one character which is not a bullet
  const formattedLines = lines.map((line) => {
    if (line.length === 0) {
      return line;
    }
    if (line[0] === bullet) {
      return line;
    }
    return `${bulletWithSpace}${line}`;
  });

  const formattedDescription = formattedLines.join("\n");
  return formattedDescription;
};

export const parseUser = (user) => {
  return {
    user: {
      isSignedIn: true,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      profilePic: {
        name: user.profilePic.name,
        displayName: user.profilePic.displayName,
      },
    },
    projects: user.projects,
    educations: user.educations,
    experiences: user.experiences,
    info: user.info
      ? user.info
      : {
          name: "",
          email: "",
          position: "",
          about: "",
          media: {
            github: "",
            linkedin: "",
            twitter: "",
            facebook: "",
            instagram: "",
            youtube: "",
            website: "",
          },
        },
  };
};
