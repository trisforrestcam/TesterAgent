import "dotenv/config"
import { createOpencode, type OpencodeClient } from "@opencode-ai/sdk/v2"
import { getProvider } from "./provider"
import type { ProviderAdapter } from "./provider/types"

async function prompt(
  client: OpencodeClient,
  provider: ProviderAdapter,
  sessionId: string,
  text: string,
) {
  const cfg = provider.toConfig()
  console.log(`\n[${cfg.providerID}/${cfg.modelID}] Prompt: ${text}`)

  const result = await client.session.prompt({
    sessionID: sessionId,
    model: { providerID: cfg.providerID, modelID: cfg.modelID },
    parts: [{ type: "text", text }],
  })

  console.log("Result:", JSON.stringify(result, null, 2))

  if (result.error) {
    console.error("Error:", result.error)
  }

  return result.data
}

async function main() {
  const provider = getProvider()
  const cfg = provider.toConfig()

  console.log(`Provider: ${cfg.providerID}`)
  console.log(`Model: ${cfg.modelID}`)
  console.log(`Base URL: ${cfg.baseURL}`)

  const { client, server } = await createOpencode({
    config: {
      provider: provider.toOpencodeConfig(),
    },
  })
  console.log(`Server: ${server.url}`)

  const session = await client.session.create({
    title: `${cfg.providerID} Tester`,
  })
  if (session.error || !session.data) {
    throw new Error(`Failed to create session: ${JSON.stringify(session.error)}`)
  }
  const sessionId = session.data.id
  console.log(`Session: ${sessionId}`)

  const res = await prompt(client, provider, sessionId, "Hello! Who are you?")
  console.log("Response:", JSON.stringify(res, null, 2))

  await server.close()
  console.log("\nDone.")
}

main().catch(console.error)
