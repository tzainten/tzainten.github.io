const VIDEO_EXT = /\.(mp4|webm|ogv|ogg|mov|m4v)$/i;

const isWhitespace = (node) =>
  node.type === "text" && (node.value ?? "").trim() === "";

const el = (tagName, properties, children = []) => ({
  type: "element",
  tagName,
  properties,
  children,
});

const text = (value) => ({ type: "text", value });

export function figures() {
  let count = 0;
  return {
    name: "figures",
    element: {
      filter: ["img"],
      visit(node, ctx) {
        const parent = ctx.parent(node);
        if (!parent || parent.type !== "element" || parent.tagName !== "p") {
          return;
        }

        const kids = (parent.children ?? []).filter((c) => !isWhitespace(c));
        if (
          kids.length !== 1 ||
          kids[0].type !== "element" ||
          kids[0].tagName !== "img"
        ) {
          return;
        }

        const src = typeof node.properties?.src === "string" ? node.properties.src : "";
        const alt = typeof node.properties?.alt === "string" ? node.properties.alt : "";
        count += 1;

        const media = VIDEO_EXT.test(src)
          ? el("video", { src, controls: true })
          : el("img", { src, alt });

        const figure = el("figure", {}, [
          media,
          el("figcaption", {}, [
            el("span", { className: ["fignum"] }, [text(`Fig. ${count}`)]),
            text(alt),
          ]),
        ]);

        ctx.replaceNode(parent, figure);
      },
    },
  };
}
