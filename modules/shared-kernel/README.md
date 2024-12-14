<br>
<div align="center">
    <h1>📦 Clean Architecture</h1>
    <strong>Shared kernel.</strong>
</div>
<br>
<br>

The shared kernel concept is not directly related to clean architecture: it's a domain-driven design concept that aims to describe a sharing pattern between different contexts and teams.

In domain-drive design, a shared kernel is a special type of bounded context that contains code and data shared across multiple bounded contexts within the same domain.  
It acts as a central repository for ubiquitous language elements, domain logic, and data structures that are common to all or a subset of the bounded contexts.  
It should be kept as small as possible since any change will need synchronization with impacted consumers.

More details [here](https://github.com/ddd-crew/context-mapping?tab=readme-ov-file#shared-kernel) and [here](https://deviq.com/domain-driven-design/shared-kernel).
