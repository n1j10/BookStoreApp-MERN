const mongoose = require("mongoose")
const dns = require("dns")
const { MongoMemoryServer } = require("mongodb-memory-server")

let memoryServer
const DEFAULT_DNS_SERVERS = ["1.1.1.1", "8.8.8.8"]

const parseDnsServers = (value) => {
    if (!value) return []
    return value
        .split(",")
        .map((server) => server.trim())
        .filter(Boolean)
}

const configureDnsForSrv = () => {
    const configuredServers = parseDnsServers(process.env.DNS_SERVERS)
    const currentServers = dns.getServers()
    const loopbackServers = new Set(["127.0.0.1", "::1", "0:0:0:0:0:0:0:1"])
    const onlyLoopback =
        currentServers.length > 0 &&
        currentServers.every((server) => loopbackServers.has(server))

    const serversToUse =
        configuredServers.length > 0
            ? configuredServers
            : onlyLoopback
                ? DEFAULT_DNS_SERVERS
                : []

    if (!serversToUse.length) return

    try {
        dns.setServers(serversToUse)
        console.log(`DNS servers configured for MongoDB SRV lookup: ${serversToUse.join(", ")}`)
    } catch (err) {
        console.warn(`Could not set DNS servers for SRV lookup: ${err.message}`)
    }
}

const connectDB = async () => {
    const uri = process.env.MONGO_URI
    const useMemory = process.env.USE_IN_MEMORY_DB !== "false"
    const dbName = process.env.DB_NAME || "bookstore"

    const connectWithUri = async (mongoUri, label = "MongoDB") => {
        await mongoose.connect(mongoUri, { dbName })
        console.log(`${label} connected successfully`)
    }

    try {
        if (!uri && !useMemory) {
            throw new Error("Missing MONGO_URI. Add it to your .env (e.g. MONGO_URI=mongodb://127.0.0.1:27017/bookstore) or set USE_IN_MEMORY_DB=true")
        }

        if (uri) {
            if (uri.startsWith("mongodb+srv://")) {
                configureDnsForSrv()
            }
            await connectWithUri(uri)
            return
        }
    } catch (err) {
        // fall through to memory server when allowed
        console.error("MongoDB connection failed:", err.message)
        if (!useMemory) throw err
    }

    if (!useMemory) return

    try {
        memoryServer = await MongoMemoryServer.create({ instance: { dbName } })
        const memUri = memoryServer.getUri()
        await connectWithUri(memUri, "In-memory MongoDB")
        console.log("In-memory MongoDB URI:", memUri)
    } catch (err) {
        console.error("In-memory MongoDB startup failed:", err.message)
        throw err
    }
}

const closeDB = async () => {
    await mongoose.disconnect()
    if (memoryServer) {
        await memoryServer.stop()
        memoryServer = null
    }
}

module.exports = { connectDB, closeDB }
