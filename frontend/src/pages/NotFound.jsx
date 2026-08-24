import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-warm-ivory px-4 text-center">
      <div className="max-w-lg w-full bg-soft-beige/60 border border-warm-taupe/30 rounded-2xl p-8 sm:p-12 shadow-luxury space-y-6">
        <div className="w-16 h-16 bg-warm-ivory border border-warm-taupe/40 text-deep-olive rounded-full flex items-center justify-center mx-auto shadow-md">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">404 Error</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
            Looks like this space hasn't been designed yet.
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70">
            The page you are looking for might have been moved, renamed, or is under architectural revision.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-transform hover:scale-105"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
