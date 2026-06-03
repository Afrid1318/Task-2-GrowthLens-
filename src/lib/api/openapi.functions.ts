import { createServerFn } from "@tanstack/react-start";
import { getServerConfig } from "../config.server";

// OpenAPI spec served from server values (config + env). Keep schemas minimal
// but configurable via environment variables for title/version/description.
export const getOpenApiSpec = createServerFn({ method: "GET" }).handler(async () => {
  const cfg = getServerConfig();

  const info = {
    title: cfg.openApiTitle ?? "GrowthLens API",
    version: cfg.openApiVersion ?? "1.0.0",
    description:
      cfg.openApiDescription ?? "OpenAPI description for GrowthLens server functions (RPC-style).",
  };

  const servers = cfg.openApiServerUrl ? [{ url: cfg.openApiServerUrl }] : [];

  const spec = {
    openapi: "3.0.3",
    info,
    servers,
    paths: {
      "/getGreeting": {
        post: {
          summary: "Get a greeting",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { name: { type: "string" } },
                  required: ["name"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Greeting result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { greeting: { type: "string" }, mode: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      },
      "/analyzeBusiness": {
        post: {
          summary: "Run business analysis (AI)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    businessName: { type: "string" },
                    industry: { type: "string" },
                    location: { type: "string" },
                    websiteUrl: { type: "string", format: "uri" },
                    competitors: { type: "string" },
                    reviews: { type: "string" },
                    notes: { type: "string" },
                  },
                  required: ["businessName"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Business analysis result",
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
            },
          },
        },
      },
    },
  } as const;

  return new Response(JSON.stringify(spec), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
});

export default {};
