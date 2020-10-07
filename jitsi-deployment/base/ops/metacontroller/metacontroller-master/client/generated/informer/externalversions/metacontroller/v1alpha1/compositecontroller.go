/*
Copyright The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Code generated by informer-gen. DO NOT EDIT.

package v1alpha1

import (
	time "time"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	runtime "k8s.io/apimachinery/pkg/runtime"
	watch "k8s.io/apimachinery/pkg/watch"
	cache "k8s.io/client-go/tools/cache"
	metacontrollerv1alpha1 "metacontroller.app/apis/metacontroller/v1alpha1"
	internalclientset "metacontroller.app/client/generated/clientset/internalclientset"
	internalinterfaces "metacontroller.app/client/generated/informer/externalversions/internalinterfaces"
	v1alpha1 "metacontroller.app/client/generated/lister/metacontroller/v1alpha1"
)

// CompositeControllerInformer provides access to a shared informer and lister for
// CompositeControllers.
type CompositeControllerInformer interface {
	Informer() cache.SharedIndexInformer
	Lister() v1alpha1.CompositeControllerLister
}

type compositeControllerInformer struct {
	factory          internalinterfaces.SharedInformerFactory
	tweakListOptions internalinterfaces.TweakListOptionsFunc
}

// NewCompositeControllerInformer constructs a new informer for CompositeController type.
// Always prefer using an informer factory to get a shared informer instead of getting an independent
// one. This reduces memory footprint and number of connections to the server.
func NewCompositeControllerInformer(client internalclientset.Interface, resyncPeriod time.Duration, indexers cache.Indexers) cache.SharedIndexInformer {
	return NewFilteredCompositeControllerInformer(client, resyncPeriod, indexers, nil)
}

// NewFilteredCompositeControllerInformer constructs a new informer for CompositeController type.
// Always prefer using an informer factory to get a shared informer instead of getting an independent
// one. This reduces memory footprint and number of connections to the server.
func NewFilteredCompositeControllerInformer(client internalclientset.Interface, resyncPeriod time.Duration, indexers cache.Indexers, tweakListOptions internalinterfaces.TweakListOptionsFunc) cache.SharedIndexInformer {
	return cache.NewSharedIndexInformer(
		&cache.ListWatch{
			ListFunc: func(options v1.ListOptions) (runtime.Object, error) {
				if tweakListOptions != nil {
					tweakListOptions(&options)
				}
				return client.MetacontrollerV1alpha1().CompositeControllers().List(options)
			},
			WatchFunc: func(options v1.ListOptions) (watch.Interface, error) {
				if tweakListOptions != nil {
					tweakListOptions(&options)
				}
				return client.MetacontrollerV1alpha1().CompositeControllers().Watch(options)
			},
		},
		&metacontrollerv1alpha1.CompositeController{},
		resyncPeriod,
		indexers,
	)
}

func (f *compositeControllerInformer) defaultInformer(client internalclientset.Interface, resyncPeriod time.Duration) cache.SharedIndexInformer {
	return NewFilteredCompositeControllerInformer(client, resyncPeriod, cache.Indexers{cache.NamespaceIndex: cache.MetaNamespaceIndexFunc}, f.tweakListOptions)
}

func (f *compositeControllerInformer) Informer() cache.SharedIndexInformer {
	return f.factory.InformerFor(&metacontrollerv1alpha1.CompositeController{}, f.defaultInformer)
}

func (f *compositeControllerInformer) Lister() v1alpha1.CompositeControllerLister {
	return v1alpha1.NewCompositeControllerLister(f.Informer().GetIndexer())
}
