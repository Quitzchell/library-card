import { RichTextItem } from "@/lib/interfaces/rich-text";

export const biographyMock = {
  async getBiography(): Promise<RichTextItem> {
    return {
      title: "Biography",
      text: "<p>Expressive yet thoughtful, abrasive yet melodious, explosive yet introvert: Rotterdam's <strong>Library Card</strong> are a band of contrasts.</p><p>This is reflected in the group's structure, the band being a tight-knit unit of four entirely different characters. The quartet started out in the summer of 2021, and it doesn't seem too far-fetched to state that a little part of that period's agitation has latched itself to the band's music, which restlessly fluctuates from angular post-punk to magnificent post-rock and fast-paced garage.</p><p>Even in a city that's known for its wayward guitar music, Library Card has quickly become a standout.</p>",
    };
  },
};
