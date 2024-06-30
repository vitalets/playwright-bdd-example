import { Page } from "@playwright/test";

export class MyFixture {
    public page: Page;
    constructor(page: Page) {
        this.page = page;
    }
}