module BreweryThreadsHelper
    def brewery_link_to(path, opts={}, &block)
        link_to path, class: brewery_link_class(path, opts), &block
    end

    def brewery_link_class(matches, opts={})
        case matches
        when Array
            "active bg-light" if matches.any?{ |m| request.path.starts_with?(m) }
        when String
            "active bg-light" if opts.fetch(:exact, false) ? request.path == matches : request.path.starts_with?(matches)
        end
    end
end
