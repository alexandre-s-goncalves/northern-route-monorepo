# NorthernRoute Logistics — Distributed Architecture Platform

## Overview
NorthernRoute Logistics is an enterprise-grade ecosystem engineered to optimize shipping operations, route tracking, and driver dispatching. The platform features an decoupled distributed architecture, utilizing a centralized manager repository that orchestrates three highly specialized, independent core components.

## Ecosystem Architecture
This repository acts as the master umbrella project, leveraging **Git Submodules** to reference and lock version histories for each individual slice of the stack:

*   **`[backend]`**: Powered by **.NET 9 Minimal APIs**, implementing Clean Architecture, Domain-Driven Design (DDD), Entity Framework Core, and transactional SQL databases.
*   **`[web]`**: A high-performance operation dashboard built with **React 19**, **Vite**, **TypeScript**, **Styled Components**, and reactive mutation states using **TanStack React Query**.
*   **`[mobile]`**: The dedicated hybrid application tailored for drivers, managing location hooks, delivery status verification, and instant push updates.

---

## Workspace Setup

### 1. Cloning the Complete System
To clone this orchestrator repository along with all components, networks, and child repositories in a single operation, utilize the recursive flag:

```bash
git clone --recursive https://github.com
cd northern-route-monorepo
```

### 2. Updating Existing Workspaces
If you have already cloned the repository and need to initialize or update missing nested connections, execute:

```bash
git submodule update --init --recursive
```

---

## Component Workflows & Isolated Verification

Each stack maintains isolated environment scopes, linting constraints, and pipeline targets. Navigate into the targeted workspace to trigger execution layers:

### Web Frontend Workspace (`/web`)
The frontend contains an embedded mock server simulating service payloads to provide independent UI development.
```bash
cd web
npm install
npm run dev
```
*   **Vite Platform Application**: `http://localhost:5173`
*   **Interactive Contract Audit Dashboard**: `http://localhost:5001`
*   **Testing Harness Suite**: `npm run test` (100% code coverage target)

### Backend API Workspace (`/backend`)
```bash
cd backend
dotnet restore
dotnet run
```

---

## Quality Gates & Static Metrics
- **Pipeline Strategy:** Each nested component triggers independent GitHub Actions workflows upon localized pushes, accelerating CI/CD evaluations.
- **Static Analysis Compliance:** Enforced via strict ESLint rulesets and SonarQube quality gates across individual repositories.
