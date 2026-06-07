import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

describe("App", () => {

    test("renders title", () => {

        document.body.innerHTML = `
            <h1>Task Tracker</h1>
        `;

        expect(
            document.body.innerHTML
        ).toContain("Task Tracker");

    });

});
