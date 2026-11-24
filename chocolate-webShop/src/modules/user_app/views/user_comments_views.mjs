export class CommentsView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(comments) {
    this.shadow.replaceChildren();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink);

    const backButton = this.createBackButton();
    this.shadow.appendChild(backButton);

    const heading = this.createHeading();
    this.shadow.appendChild(heading);

    if (comments.length === 0) {
      const message = this.createEmptyMessage();
      this.shadow.appendChild(message);
      return;
    }

    const commentsList = this.createCommentsList(comments);
    this.shadow.appendChild(commentsList);
  }

  createHeading() {
    const heading = document.createElement("h2");
    heading.textContent = "Product reviews";

    return heading;
  }

  createBackButton() {
    const button = document.createElement("button");
    button.textContent = "← Back";
    button.classList.add("back-button");

    button.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("backClick"));
    });

    return button;
  }

  createEmptyMessage() {
    const message = document.createElement("p");
    message.textContent = "No reviews yet";

    return message;
  }

  createCommentsList(comments) {
    const section = document.createElement("section");

    comments.forEach((comment) => {
      const commentCard = document.createElement("div");

      const rating = document.createElement("p");

      const fullStars = Math.floor(comment.rating);
      const halfStar = comment.rating - fullStars >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

      rating.textContent =
        "★".repeat(fullStars) +
        (halfStar ? "⯪" : "") +
        "☆".repeat(emptyStars) +
        " (" +
        comment.rating +
        "/5)";

      const commentText = document.createElement("p");
      commentText.textContent = comment.comment_text;

      commentCard.appendChild(rating);
      commentCard.appendChild(commentText);
      section.appendChild(commentCard);
    });

    return section;
  }
}

customElements.define("comments-view", CommentsView);
