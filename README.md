<br>
<div align="center">
    <h1>📦 clean-architecture</h1>
    <strong>A clean architecture example to implement testable and evolutive systems</strong>
</div>
<br>
<br>

## ✨ Features

A TypeScript implementation of [the Clean Architecture specified by Robert C. Martin (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

The Clean Architecture is an architectural pattern (a layered architecture) that enables the creation of loosely coupled and testable systems by enforcing a clear separation of concerns. This separation isolates the business rules from the details (such as frameworks and external dependencies like databases), making the system more maintainable and evolutive.

Following the ["decompose by subdomain" pattern](https://microservices.io/patterns/decomposition/decompose-by-subdomain.html), a **modular architecture** has also been implemented to encapsulate and group all concerns from presentation to data per bounded context[^1]. This modular monolith approach enables decision autonomy within a module boundary[^2] and the creation of [self-contained systems](https://scs-architecture.org/) centered around business capabilities[^3].  
Furthermore, drawing inspiration from [the Vertical Slice Architecture](https://www.jimmybogard.com/vertical-slice-architecture/) and the [package by feature not by layer pattern](https://phauer.com/2020/package-by-feature/), top-level directories within a module (excluding the `shared` folder) are centered around **business features**[^3] and, optionally, around actors for entities coupled to gateways. It allows not only to [scream the application intent](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html) allowing better discoverability from the domain point of view but also to create cohesive and loosely-coupled components.
Second-level directories and the `shared` directory are organized following the clean architecture layers to enforce/materialize the dependency rule and bring clarity about each layer scope.

[^1]: In this repository, a [bounded context](https://martinfowler.com/bliki/BoundedContext.html) is implemented by one module, so a bounded context is equivalent to a module here. However, it's not always the case since [a bounded context is not strictly equivalent to a module](https://stackoverflow.com/a/77923055). Indeed, while a module is a technical-oriented concept that defines logical boundaries in the code, a [bounded context](https://deviq.com/domain-driven-design/bounded-context) is a business-oriented one (domain-driven design tactical pattern) that represents a [cohesive area of the business domain](https://ddd-practitioners.com/2023/03/07/the-difference-between-domains-subdomains-and-bounded-contexts/). A module is a technical enabler to implement a bounded context, which can contain one or multiple modules.

[^2]: By its standalone nature, a module enables more easily local decisions such as which architecture makes the most sense depending on the nature of the business and its complexity. For example, a module A with no or little business logic can implement a non-layered architecture (e.g. MVC, [transaction scripts](https://martinfowler.com/eaaCatalog/transactionScript.html), ...) while a module B with more extensive and complex business rules can use a [layered-like architecture to allow better separation of concerns](https://ddd-practitioners.com/home/glossary/layered-architecture/) (e.g. Clean Architecture, Onion Architecture, ...). In the repository, we're focusing on the clean architecture. Consequently, each module implements this architecture.

[^3]: A feature represents solution functionality that delivers business value while a capability represents larger solution functionality (generally a subdomain) grouping multiple features together in a cohesive way.

<br>

## 🏗️ Architecture

### Overview

**TODO (architecture diagram with control flow following [Clean architecture diagram (from the book)](https://i.sstatic.net/K44FQ.jpg)).**

### Components

Used building blocks (including [DDD tactical patterns](https://vaadin.com/blog/ddd-part-2-tactical-domain-driven-design)):

- Entities
- Value Objects
- ...

### Layers

![Clean Architecture Layers](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

- [Enterprise Business Rules (Entities)](./modules/catalog/src/entities/): TODO.
- [Application Business Rules (Use Cases)](./modules/catalog/src/useCases/): TODO.
- [Interface Adapters](./modules/catalog/src/adapters/): Concrete implementation of ports folder that can include entity gateways, interface for data source implemented framework side, other repository/service gateways and GUI design pattern implementation (MVC, MVVM, MVP, ...).
- [Frameworks & Drivers](./modules/catalog/src/frameworks/): React views (and hooks), data source (including HttpDataSource to make fetch calls with error management, database client (Redis, SQL, MongoDB, ...), ...), ... TODO (include hosts (main component orchestrator)).
- [Hosts](./hosts): Act like the configurator instance in the [Hexagonal Architecture](https://alistaircockburn.com/Hexagonal%20Budapest%2023-05-18.pdf). Under the Clean Architecture, the host layer is the outermost layer. It includes the initial entry point of the system called the main component in the Clean Architecture book (in the "Main Component" chapter). This layer is not depicted in the diagram shown above. The main component is on the driver side (for example, Web UI, CLI, Back-end server, ...) and is responsible to instantiate inner layers.

### Modules

**TODO: package diagram / choosen feature split (catalog, ...) with slice across the different layers.**

#### A special module: the Shared Kernel.

See [documentation](./modules/shared-kernel/).

<br>

## 📚 Resources

- [Clean Architecture original blog post](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
- [Clean Architecture talk (video)](https://www.youtube.com/watch?v=Nsjsiz2A9mg).
- [Clean Architecture book summary](https://github.com/serodriguez68/clean-architecture/).
- [Domain-Driven Design tactical design and Clean Architecture (video)](https://www.youtube.com/watch?v=hf_XBb5cSoA).
- [Pull-based vs push-based approach managing use case output](https://softwareengineering.stackexchange.com/a/420360) or [why presenters (push-based) should be preferred to returned use case values (pull-based)](https://lukemorton.tech/articles/nuances-in-clean-architecture). TLDR; Communication from Controller to Presenter is meant to go through the application layer, making the Controller do part of the Presenters job is likely a domain/application leak.
- [Single responsibility principle and mixing presenter/controller](https://stackoverflow.com/questions/64415618/clean-architecture-controller-and-presenter-should-always-be-separate-classes-o). TLDR; Not mixing them allows better flexibility later if some other ways of displaying data (i.e. presenters) should be supported (Web, CLI, JSON, ...).

<br>

## ✍️ Contribution

We're open to new contributions, you can find more details [here](https://github.com/adbayb/clean-architecture/blob/main/CONTRIBUTING.md).

<br>

## 📖 License

[MIT](https://github.com/adbayb/clean-architecture/blob/main/LICENSE "License MIT")

<br>
