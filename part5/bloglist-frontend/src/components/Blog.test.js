import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog tests", () => {
  const blog = {
    title: "React test",
    author: "Filip Wojno",
    url: "google.com",
    likes: 10,
    user: {
      name: "filip",
    },
  };
  let mockUpdateBlog = jest.fn();
  let mockDeleteBlog = jest.fn();
  test("renders title and authro", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );

    expect(component.container).toHaveTextContent("React test");
    expect(component.container).toHaveTextContent("Filip Wojno");
  });

  test("clcking button displays url and number of likes", async () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
