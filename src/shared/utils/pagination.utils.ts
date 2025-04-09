export const PaginationUtils = {
    RESULTS_PER_PAGE: 10,

    calculatePage: function(page: number) {
        page = page - 1 || 0;
        const list_offset = page * this.RESULTS_PER_PAGE;

        return { list_offset, results_per_page: this.RESULTS_PER_PAGE }
    }
}