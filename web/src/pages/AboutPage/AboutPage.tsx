const AboutPage = () => {
  return (
    <>
      <h1>About Domain Watch</h1>
      <p>
        Domain Watch was made by{" "}
        <a href="https://zack.computer" rel="noopener noreferrer" className="link-style">
          Zack Sheppard
        </a>{" "}
        as{" "}
        <a href="https://traveler.dev" rel="noopener noreferrer" className="link-style">
          Traveler Dev Ltd
        </a>{" "}
        (an English company, number 13120175).
      </p>
      <p>
        It is an open source project under the MIT license. You can view{" "}
        <a
          href="https://github.com/zackdotcomputer/domainwatch"
          rel="noopener noreferrer"
          className="link-style"
        >
          the source for it here
        </a>
        .
      </p>
    </>
  );
};

export default AboutPage;
