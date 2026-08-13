---
title: Variational Autoencoders
timestamp: 2026-01-13T07:22:03.000Z
category: machine-learning
subcategory: autoencoders
tags:
  - machine-learning
  - autoencoders
description: Overview of VAEs
toc: false
draft: true
---
### What are VAEs?
Variational autoencoders are used as a generative model to generate data from a given dataset without needing to understand the underlying structure of the dataset. The goal is to create a function to represent a given dataset distribution to then generate data. In a generative process, we aim to maximize the following: 
$$
P(X) = \int P(X|z;\theta)P(z)dz
$$
This essentially is saying: we wish to optimize $\theta$ such that we can sample z from P(z) and, with high probability, f (z; θ) will be like the X’s in our dataset. 

**Latent Variable Creation**: VAE's choose a latent variable, $z$, by assuming it comes from a normal distribution, $\mathcal{N}(0, I)$. How can a normal distribution represent any given dataset? The key is that the latent variable will be mapped through a sufficiently complex function to represent our data.  See this figure from reference 1. 
![[Pasted image 20260311162105.png]]


#### Objective 
The core objective of the VAE is to sample values from z that likely produced X and create P(X) from those. To do so, we need to introduce $Q(z|X)$ that gives us the probability for a given X, the z that produced that X. Optimally, we want $Q(z|X)$ to be a much tighter space than the entire space of P(z). To compute our objective or perform gradient descent, we compute the Kullback-Leibler divergence (KL divergence or D) between P(z|X) and Q(z). After some rearranging and using bayes formula, we arrive at our final equation:
$$
log(P(x)) - \mathcal{D}[Q(z|X) || P(z|X)] = \mathbb{E}_{z\sim Q}[log(P(X|z))] - \mathcal{D}[Q(z|X)||P(z)]
$$
In words, we want to perform gradient descent, the loss becomes the negative of the right side. The right side is saying we want to maximize log(P(X|z)) which means we want to maximize the probability of getting X from z. 