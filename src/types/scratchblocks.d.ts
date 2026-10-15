declare module "scratchblocks" {
  const scratchblocks: {
    parse(code: string, options?: Record<string, unknown>): unknown;
    render(
      doc: unknown,
      options?: Record<string, unknown>,
    ): SVGSVGElement;
    renderMatching(
      selector: string,
      options?: Record<string, unknown>,
    ): void;
  };
  export default scratchblocks;
}
