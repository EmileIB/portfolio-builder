// function to transform DD/MM/YYYY to MM/YYYY
export const formatDate = (date) => {
  const [month, , year] = date.split("/");
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
