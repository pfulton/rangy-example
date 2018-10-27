import rangy from "rangy/lib/rangy-core.js";
import rangyClassApplier from "rangy/lib/rangy-classapplier";
import rangyHighlight from "rangy/lib/rangy-highlighter";
import rangyTextRange from "rangy/lib/rangy-textrange";
import rangySerializer from "rangy/lib/rangy-serializer";

///// Initial Text Selection
// A bit of text is selected
// - A "Make a New Comment" button appears near the selection
// - User clicks away:
//   - button disappears/is destroyed from DOM
// - User clicks the button:
//   - selected text is "highlighed" in some way. Wrapped in a span?
//     - highlighted text can be reselected, but this will not trigger comment button
//     - text outside of the highlight that INCLUDES the highlight is treated as "new" and can trigger a comment button
//   - new, empty "comment" text field component is injected into the pane
// - User clicks the button and starts to enter text, but clicks CANCEL
//   - "state reset"
//   - comment is destroyed
//   - highlight wrapper is destroyed
//   - comment button is destroyed

rangy.init();

const selectableArea = document.querySelector(".will--accept-seletions");
const newCommentButton = document.createElement("button");
newCommentButton.classList.add("create-new-comment");
newCommentButton.innerHTML = "Add New Comment";

// selectableArea.addEventListener("click", function(e) {
//   console.log("clicked inside");
//   // on clicking inside the column,
//   // check to see if a selection has been made
//   // rangy.getSelection().isCollapsed = true -> means nothing is selected
//   // rangy.getSelection().isCollapsed = false -> something has been selected
//   if (!rangy.getSelection().isCollapsed) {
//     console.log("in getSelection");
//     if (document.querySelector(".create-new-comment") === null) {
//       console.log("append New Comment Button");
//       selectableArea.appendChild(newCommentButton);
//       newCommentButton.addEventListener("click", function(e) {
//         e.stopPropagation();
//         console.log("fired new comment button click");
//         this.remove();
//         console.log("removed new comment button from DOM");
//         const highlighter = rangy.createHighlighter();
//         highlighter.addClassApplier(rangy.createClassApplier("is-highlighted"));
//         highlighter.highlightSelection("is-highlighted");
//         console.log("created highlight around selection");
//       });
//     }
//   }
// });

selectableArea.addEventListener("click", function(e) {
  console.log("clicked inside");

  if (!rangy.getSelection().isCollapsed) {
    console.log("text has been selected");
    if (document.querySelector(".create-new-comment") === null) {
      console.log("append New Comment Button");
      selectableArea.appendChild(newCommentButton);
      newCommentButton.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log("fired new comment button click");
        this.remove();
        console.log("removed new comment button from DOM");
        const highlighter = rangy.createHighlighter();
        highlighter.addClassApplier(rangy.createClassApplier("is-highlighted"));
        highlighter.highlightSelection("is-highlighted");
        console.log("created highlight around selection");
      });
    }
  } else {
    rangy.getSelection().removeAllRanges();
    console.log("called removeAllRanges()");
    const button = document.querySelector(".create-new-comment");
    if (button !== null) {
      button.remove();
    }
  }
});
